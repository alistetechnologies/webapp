
export const postAllData = async (url, data) => {
    const res = await instance({
      method: "post",
      url,
      data,
    });
  
    return res;
  };
  export const postAllReportData = async (url, data) => {
    const res = await instanceReport({
      method: "post",
      url,
      data,
    });
  
    return res;
  };

  
export const getAllData = async (url) => {
    const res = await instance({
      method: "get",
      url,
    });
  
    return res;
  };