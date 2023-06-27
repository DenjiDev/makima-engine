import { IOption } from "./option.interface";

let isFirst = true
let isNextAudio = false
let lastUser: string
export const respondOptions: IOption[] = [{
    message: "Conversar com o Chat GPT"
},
{
    message: "Menu"
},
{
    message: "Opções"
},
{
    message: "Transcrever áudio"
},
{
    message: "GPT me responda"
},
// {
//   message: "Remover membro(s)", action: async (client: any, message: any, gpt?: GptService) => {
//     if (!message.mentionedJidList) {
//       return client.sendText(message.chatId, `Por favor mencione os membros que deseja remover!`)
//     }
//     message.mentionedJidList.map(async (jid: string, index: number) => {
//       if (index === 0) return
//       await client.removeParticipant(message.chatId, jid);
//     })
//     isFirst = true
//   }
// },
// {
//   message: "Adicionar", action: async (client: any, message: any) => {
//     // const messageToSend = `Pronto, agora é só mencionar !`
//     // client.sendText(message.chatId, messageToSend)
//     // isNextAction = true
//     // lastUser = message.author
//     if (!message.mentionedJidList) {
//       return client.sendText(message.chatId, `Por favor mencione os membros que deseja remover!`)
//     }
//     message.mentionedJidList.map(async (jid: string, index: number) => {
//       if (index === 0) return
//       await client.addParticipant(message.chatId, jid);
//     })
//     isFirst = true
//   }
// },
{
    message: "GPT crie uma imagem"
},
{
    message: "Criar imagem"
}
];