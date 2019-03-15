export default {
    addDollarSign(val) {
        return '$ '+val;
    },
    addBtcSign(val) {
        return 'Ƀ '+val;
    },
    addLtcSign(val) {
        return 'Ł '+val;
    },
    roundToHundreds(val) {
        return (val * 100) / 100;
    }
}