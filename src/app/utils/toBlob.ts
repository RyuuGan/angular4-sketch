export default function (dataURI) {
  let chunks = dataURI.split(',')
    , byteString;
  if (chunks[0].indexOf('base64') >= 0) {
    // Convert base64 to raw binary data held in a string
    byteString = window.atob(chunks[1]);
  } else {
    // Convert base64/URLEncoded data component to raw binary data
    byteString = decodeURIComponent(chunks[1]);
  }
  // Write the bytes of the string to buffer
  let intArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    intArray[i] = byteString.charCodeAt(i);
  }
  let mimeString = chunks[0].split(':')[1].split(';')[0];
  return new Blob([intArray], {
    type: mimeString
  });
};
