/**
 * Validate matrix
 *
 * @author camilo.ordonez
 *
 */
export const validateMatrix = (data: (string[])[]) => {
    let validate = true
    data.forEach((element) => {
        if(element.length !== data.length) {
            validate = false
        }
    })
    return validate
}
