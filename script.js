import fs from 'fs';
import { resolve } from 'path';


fs.readFile(resolve(__dirname, 'data.txt'), (err,data) => {
    const phones = data.toString()
        .split(/(\r\n\r\n)/)
        .map(line => {
          if (line !== "\r\n\r\n")
            return line.replace(/^\+(\d{2,3})(\d{3})(\d{3})(\d{3})$/, "+$1 $2 $3 $4");
        }).filter(line => !!line);
    
    fs.writeFileSync(resolve(__dirname, 'output.txt'), phones.join('\n'));

});
