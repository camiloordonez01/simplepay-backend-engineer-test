export default class {
    async getStats() {
        return {
            countAnomalies: 3,
            countNoAnomalies: 2,
        }
    }

    async save(_: unknown) {
        return true
    }

    async update(_: number, __: unknown) {
        return true
    }
}
