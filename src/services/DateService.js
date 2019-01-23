export default class DateService {

    WEEK =  [ "日", "月", "火", "水", "木", "金", "土" ];

    formatDate(date, format = 'YYYY/MM/DD HH:mm:ss AP') {
        if (!date) return null;

        format = format.replace(/YYYY/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        format = format.replace(/W/g,  (this.WEEK[date.getDay()]));

        return format;
    }

}