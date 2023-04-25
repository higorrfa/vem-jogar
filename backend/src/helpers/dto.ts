export interface IUser {
    name: string
    email: string
    password: string
    favoriteSport: string
    age: number
    address: string
}

export interface IGroup {
    name: string
    sport: string
    minimumAge: number
    isPrivate: boolean
    isFree: boolean
    value: number
    address: string
    additionalInformation: string
    adminID: number
}
