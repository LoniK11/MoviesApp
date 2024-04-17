import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function urlValidator(): ValidatorFn{
    return (control: AbstractControl):ValidationErrors | null => {
        const urlPattern = /^(ftp|http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

        return control.value && !urlPattern.test(control.value) ? {url:true} : null;
    }
}