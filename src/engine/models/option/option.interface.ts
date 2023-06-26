export interface IOption {
    message: string,
    action: (client: any, message: any) => Promise<void>,
    show: boolean
}