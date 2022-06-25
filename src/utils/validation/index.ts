import * as CoreRules from "./rules/index";
const _coreRules: any = CoreRules;

/**
 * Validation fields.
 * @param {object fields to validate} fn
 * @param {default fields with config} storeValues
 */
export function validateFields(fn: Function, storeValues: any) {
  let fields = fn.call({}, null, null);
  let valid = true;
  let values = {};

  Object.keys(fields).map((key) => {
    const field = fields[key];
    if (field.rules) {
      const statusObjField = validate(field);
      fields[key] = { ...fields[key], ...statusObjField };
      if (statusObjField.validation.errors.length > 0) {
        valid = false;
      }
    } else {
      fields[key] = {
        ...fields[key],
        validation: { errors: [], dirty: false },
      };
    }

    values = { ...values, [field.name]: field.value };
  });

  storeValues.set({ fields, values, valid });
}

/**
 * Validate field by rule.
 * @param {configs field} field
 */
export function validate(field: any) {
  let { value, rules } = field;

  let valid = true;
  let rule;
  let errors: any[] = [];

  if (rules) {
    rules.map((validator: any) => {
      // For file type.
      if (validator === "file") {
        if (value) {
          Object.keys(value).map((i) => {
            Object.keys(field.file).map((r) => {
              valid = _coreRules[r].call(null, value[i], field.file[r]);
              if (!valid) {
                errors = [...errors, r];
              }
            });
          });
        }
      } else {
        // For custom rule.
        if (typeof validator === "function") {
          valid = validator.call();
          rule = validator.name;
        } else {
          const args = validator.split(/:/g);
          rule = args.shift();
          valid = _coreRules[rule].call(null, value, args);
        }
        if (!valid) {
          errors = [...errors, rule];
        }
      }
    });
    return { ...field, validation: { errors, dirty: errors.length > 0 } };
  } else {
    return { ...field, validation: { errors, dirty: false } };
  }
}
