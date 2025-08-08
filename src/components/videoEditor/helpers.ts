const toTimeString = (sec: string | number, showMilliSeconds: boolean = true): string => {
  const secNum = parseFloat(sec.toString());
  let hours: number | string = Math.floor(secNum / 3600);
  let minutes: number | string = Math.floor((secNum - hours * 3600) / 60);
  let seconds: number | string = secNum - hours * 3600 - minutes * 60;
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  const maltissaRegex: RegExp = /\..*$/; // matches the decimal point and the digits after it e.g if the number is 4.567 it matches .567
  const millisec: RegExpMatchArray | null = String(seconds).match(maltissaRegex);
  return (
    hours +
    ":" +
    minutes +
    ":" +
    String(seconds).replace(maltissaRegex, "") +
    (showMilliSeconds ? (millisec ? millisec[0] : ".000") : "")
  );
};

const readFileAsBase64 = async (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const download = (url: string): void => {
  const link: HTMLAnchorElement = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  link.click();
};

export { toTimeString, readFileAsBase64, download };