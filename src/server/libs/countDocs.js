async function countDocs(model) {
  const count = await model.countDocuments();
  return count;
}

export default countDocs;
