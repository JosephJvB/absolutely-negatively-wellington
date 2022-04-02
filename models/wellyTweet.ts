export interface ITweet {
    id: string
    text: string
}
const punctuation = [
    '.',
    ',',
    '!',
    ' ',
    '',
]
const affirms = [
    'yes',
    'yeah',
    'yup'
    // 'can'
]
const negates = [
    'no',
    'can\'t',
    'cannot',
    'nope',
]
export default class WellyTweet implements ITweet {
    id: string
    text: string
    constructor(data: ITweet) {
        this.id = data.id
        this.text = data.text
    }

    // todo more logic
    get cantBeBeat(): boolean {
        const tLower = this.text.toLowerCase()
        const wordsLower = tLower.split(' ')
        // ignore any affirmation text
        // handle: text incl. yes and no
        const affirmed = wordsLower.find(w => affirms.includes(w))
        if (affirmed) {
            return false
        }
        return tLower.startsWith('no')
            || !!negates.find(n => !!punctuation.find(p => wordsLower.includes(n + p)))
            // wordsLower.find(word => word == anyNegate + anyPunctuation)
    }
}