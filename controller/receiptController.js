import * as receiptRepository from '../repository/receiptRepository.js'

/**
 * 회원의 배송지 리스트 조회
 */ 
export async function getrecList(req, res) {
  const userId = req.params.userId;
  const rows = await receiptRepository.getrecList(userId);
  res.json(rows);
}
/**
 * 회원의 기본 배송지 조회
 */ 
export async function getOrderRecInfo(req, res) {
  const userId = req.params.userId;
  const row = await receiptRepository.getOrderRecInfo(userId);
  row.length!==0 ? res.json(row) : res.json('none');
}

/**
 * 선택한 배송지 조회
 */
export async function getSelectedRec(req, res) {
    const recId = req.params.recId;
    console.log(recId);
    const row = await receiptRepository.getSelectedRec(recId);
    res.json(row);
}

/**
 * 배송지 추가
 */
export async function insertRec(req, res) {
    const {userId, recName, recPhone, recAddress, recDetailAddress, recDefault} = req.body;
    const name = recName;
    const phone = recPhone;
    const address = `${recAddress} ${recDetailAddress}`;
    const isDefault = recDefault;
    const result = await receiptRepository.insertRec(userId, name, phone, address, isDefault);
    res.json(result);
}

/**
 * 배송지 수정
 */
export async function updateRec(req, res) {
    const {userId, recId, recName, recPhone, recAddress, recDetailAddress, recDefault} = req.body;
    const name = recName;
    const phone = recPhone;
    const address = `${recAddress} ${recDetailAddress}`;
    const isDefault = recDefault;
    if(isDefault === 0){
        const result = await receiptRepository.updateRec(recId, name, phone, address, isDefault);
        res.json(result);
    }else{
        const deleteResult = await receiptRepository.deleteDefaultRec(userId);
        if(deleteResult === 'ok'){
            const result = await receiptRepository.updateRec(recId, name, phone, address, isDefault);
            res.json(result);
        }
    }
}