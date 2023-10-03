export const generateRandomDate = (): Date => {

    const randomYear = Math.round(Math.random() * 22) + 2001;
    const randomMonth = Math.round(Math.random() * 11);
    const randomDay = Math.round(Math.random() * 6);

    const randomDate = new Date(randomYear, randomMonth, randomDay);

    const maxDate = new Date(new Date().setDate(new Date().getDate() - 1));
    const minDate = new Date(2001, 1, 10);

    if (randomDate > maxDate || randomDate < minDate) {
        console.log('❌ entramos');
        return generateRandomDate();
    }

    return randomDate;
}