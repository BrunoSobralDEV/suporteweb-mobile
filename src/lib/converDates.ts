
export function convertDateToString(date: Date) {
  const day = date.getDate()<10
    ?`0${date.getDate()}`
    :`${date.getDate()}`;

  const month = date.getMonth()+1<10
    ?`0${date.getMonth()+1}`
    :`${date.getMonth()+1}`;
    
  const year = '20'+date.getFullYear().toLocaleString().substring(3,5);
  const hour = date.getHours()<10?`0${date.getHours()}`:`${date.getHours()}`;
  const min = date.getMinutes()<10?`0${date.getMinutes()}`:`${date.getMinutes()}`;

  return `${day}/${month}/${year} às ${hour}:${min}`;
}