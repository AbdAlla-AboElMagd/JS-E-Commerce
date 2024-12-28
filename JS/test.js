import {
  storeObjectFirestore,
  getAllTableData,
  getSingleDataWithID,
  getDataWithKeyValue,
  searchWithKeyAndValue,
  updateData,
  deleteDataFromTable,
} from "./dealingWithFirestore.js";

/********  Testing storeObjectFirestore *************/
async function testingStoreObjectFirestore(tableName, objectData) {
  await storeObjectFirestore(tableName, objectData);
}
// let dummyUser = {
//   name: "Creation Test",
//   gender: "male",
//   password: "123456",
//   email: "dummyUser@a.com",
//   isAdmin: "0",
// };
// let dummyId = testingStoreObjectFirestore("users", dummyUser);
/******** Testing testGetAllTableData **************/
async function testGetAllTableData(tableName) {
  let data = await getAllTableData(tableName);
  console.log(data);
}

// testGetAllTableData("users");
/**************************************************** */

/******** Testing testGetSingleDataWithID **************/
async function testGetSingleDataWithID(tableName, id) {
  let data = await getSingleDataWithID(tableName, id);
  console.log(data);
}

// let id = "heYxRu6w8wT3BIMKtSYn";
// testGetSingleDataWithID("users", id);
/***************************************************** */
/******** Testing getDataWithKeyValue **************/
async function testGetDataWithKeyValue(tableName, key, value) {
  let data = await getDataWithKeyValue(tableName, key, value);
  console.log(data);
}

// testGetDataWithKeyValue("users", "gender", "male");

/**************************************************** */
/********** Testing searchWithKeyAndValue *************/
async function testSearchWithKeyAndValue(tableName, key, value) {
  let data = await searchWithKeyAndValue(tableName, key, value);
  console.log(data);
}
// testSearchWithKeyAndValue("users", "gender", "male");
// testSearchWithKeyAndValue("users", "email", "ad");
// testSearchWithKeyAndValue("users", "email", "cus");
// testSearchWithKeyAndValue("users", "email", "test");

/**************************************************/
/********** Testing updateData *******************/
async function testUpdateData(tableName, id, data) {
  await updateData(tableName, id, data);
}

// let id = "heYxRu6w8wT3BIMKtSYn";
// let data = { name: "Updated", gender: "female" };
// testUpdateData("users", id, data);
// testGetSingleDataWithID("users", id);

/***************************************************/
/********** Testing deleteDataFromTable *******************/
async function testDeleteDataFromTable(tableName, id) {
  await deleteDataFromTable(tableName, id);
}
// let id = "w1PJC4yhEImTfiXegdkB";
// testDeleteDataFromTable("users", id);
