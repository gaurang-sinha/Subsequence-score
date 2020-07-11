// Take the first 3000 characters from the file and find the subsequence with the highest score as per the following formulae
// Math.pow(length, 2) * Math.pow((frequency - 1), 0.33)
// length: subsequence length
// frequency: number of times the subsequence is repeated in the full file



const fs = require('fs').promises;
function randomString()
{
	let chars = "abcdefghiklmnopqrstuvwxyz";
	let string_length = 1000;		//any random values ,only for adding alphabets in the csv file
	let j = 100;					//any random value accordingly for file size,but characters in different line
	let randomstring = '';
	while (j > 0)
	{
		for (let i=0; i < string_length; i++) 
		{
			let rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		randomstring.split('\n')
		j -= 1;
	}
	return randomstring;
}

const f_name = "file1.csv";
const data = randomString('file1.csv');
function csv_file_size() 
{
	const fs = require("fs"); //Load the filesystem module
	const stats = fs.statSync(f_name);
	const fileSizeInBytes = stats.size;
	return parseInt(fileSizeInBytes);
}


function bytesToSize(bytes) 
{
   let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


function appending_csv()
{
	let fs = require('fs');
 	let data1 = randomString();
	fs.appendFileSync(f_name,data, 'utf8');    // callback function
}


async function main(f_size)
{

	try
	{
	  await fs.writeFile(f_name, data);	// need to be in an async function
	}
	catch(e)
	{
	  console.log(e)
	}
	let loop = true
	while(loop)
	{
		if (csv_file_size() < f_size)
		{
			appending_csv();
		}
		else
		{
			loop = false
		}
	}
	console.log(csv_file_size())
	try
	{	
	 	const data = await fs.readFile(f_name);
	 	let h = {};
	 	let hs = new Set();
	 	let j = 0;
	 	let i = 0;
		function hmm()
		{
	 		let counter = 1;
	 		return counter
	 	}
	 	while(j < 100000)	//loop must run till end of file to read all characters
	 	{
			let sub = '';
			for(let i = j;i < j + 3000; i++)		//iteration logic for 3000 subsequence characters,change the value from 30 to 3000
			{			
				sub += String.fromCharCode(data[i]);
			} 
			j += 1
			if (hs.has(sub) == true)
			{
				h[sub] += 1;
			}
			else
			{
				hs.add(sub);
				h[sub] = hmm()
			}
		}
		
		let max="";
		let result = Object.keys(h).reduce(function(acc, val){
		    if(max < h[val]) (max=h[val], acc={});
		    if(h[val]==max) acc[val] = Math.pow(3000, 2) * Math.pow((h[val] - 1), 0.33);
		    return acc;
		},{});
		console.log(result)		//will print the subsequence of 3000 characters and the score of that particular subsequence
	}
	catch (error)
	{
	  console.log(error)
	}
}

let desired_f_size_in_GB = 3;
var desired_f_size_in_bytes = desired_f_size_in_GB*1024*1024*1024;		//file size in bytes for creating a 3gb csv file 
main(desired_f_size_in_bytes)

