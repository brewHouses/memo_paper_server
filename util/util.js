function gen_white_buffer(length, width){
  var len = length * width * 4
  var buf = Buffer.alloc(length * width * 4, 0)
  //let len = buf.length
  /*
  console.log(len);
  for(let i = 3; i < len; i += 4){
    buf[i] = 0;
    buf[i-1] = 255;
    buf[i-2] = 255;
    buf[i-3] = 255;
  }
  */
  return buf;
}

module.exports = {
  gen_white_buffer: gen_white_buffer,
}
