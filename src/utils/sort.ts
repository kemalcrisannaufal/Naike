/* eslint-disable @typescript-eslint/no-explicit-any */
const sortDataByDate = (data: any[], key: string) =>
  data.sort(
    (a: any, b: any) => new Date(b[key]).getTime() - new Date(a[key]).getTime()
  );

export { sortDataByDate };
