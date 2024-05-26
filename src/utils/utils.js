const removeConfigFromObjects = (array) => {
    return array.map((obj) => {
        if (obj.hasOwnProperty("config")) {
            const newObj = { ...obj }; // Create a shallow copy of the object
            delete newObj.config; // Remove the 'config' property from the copy
            return newObj; // Return the modified copy
        }
        return obj; // Return the original object if it doesn't have 'config'
    });
};

export const convertUserObjs = (data) => {
    let _data =  JSON.stringify(data);
    let result = JSON.parse(_data);

    try {
        result.data.mss = result.data.mss.map((mssObj) => {
            if (Array.isArray(mssObj.business)) {
                mssObj.business = removeConfigFromObjects(mssObj.business);
            }
            if (mssObj.hasOwnProperty("config")) {
                delete mssObj.config;
            }
            return mssObj;
        });
        return result; // Return the modified result object
    } catch (error) {
        console.warn("error return data"); // Log a warning if an error occurs
        return result; // Return the original result object if there's an error
    }
}
