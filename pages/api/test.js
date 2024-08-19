export default function handler(요청, 응답) {
    console.log(123)
    if (요청.method == 'POST') {
        return 응답.status(200).json('완료')
    }
}