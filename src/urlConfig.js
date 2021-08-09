const baseUrl = "https://amazekart-admin.herokuapp.com"

export const api = `${baseUrl}/api`
export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/${fileName}`
}