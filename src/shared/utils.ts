export const asyncForEach = async (arry: any[], callback: any) => {
  if (!Array.isArray(arry)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < arry.length; index++) {
    await callback(arry[index], index, arry);
  }
};
