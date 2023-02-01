function getUserFromId(users, id) {
  // filter by id and get first record
  return users.find((element) => {
    return element.id === id;
  });
}

export default getUserFromId;
