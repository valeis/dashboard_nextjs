const commentPostedTime = (timeInMileSec:number) => {
    let sec = (timeInMileSec / 1000).toFixed(0);
    let min = (timeInMileSec / (1000*60)).toFixed(0);
    let hrs = (timeInMileSec / (1000*60*60)).toFixed(0);
    let days = (timeInMileSec / (1000*60*60*24)).toFixed(0);
    let weeks = (timeInMileSec / (1000*60*60*24*7)).toFixed(0);
    let months = (timeInMileSec / (1000*60*60*24*31)).toFixed(0);
    let years = (timeInMileSec / (1000*60*60*2*12)).toFixed(0);

    if (parseInt(sec) < 60){
        return " seconds";
    } else if (parseInt(min) < 60) {
        return min + " mins";
    } else if (parseInt(hrs) < 24){
        return hrs + " hrs";
    } else if (parseInt(days) < 7){
        return days + " days";
    } else if (parseInt(weeks) < 4){
        return weeks + " weeks";
    } else if (parseInt(months) < 12){
        return months + " months";
    } else {
        return years+ "year";
    }
};

export { commentPostedTime };