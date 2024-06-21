export const getOptions = (dataObj) => {
    let options = '';

    Object.keys(dataObj).forEach((key) => {
        options += `<option class="option" value="${dataObj[key].value}">${dataObj[key].label}</option>`;
    });
    return options;
};
