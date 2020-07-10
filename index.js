// Take the first 3000 characters from the file and find the subsequence with the highest score as per the following formulae
// Math.pow(length, 2) * Math.pow((frequency - 1), 0.33)
// length: subsequence length
// frequency: number of times the subsequence is repeated in the full file
//  basically, you will have to call a random function that will generate a lowercase string(ASCII maar lena)
//  before generating check if the size of the file jisme dump kara rahe ho , 3 gb hogya kya


const fs = require('fs').promises;
function randomString()
{
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var string_length = 300;		//any random values ,only for adding alphabets in the csv file
	var j = 10;					//any random value accordingly for file size,but characters in different line
	var randomstring = '';
	while (j > 0)
	{
		for (var i=0; i < string_length; i++) 
		{
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		randomstring.split('\n')
		j -= 1;
	}
	return randomstring;
}


const data = randomString('file1.csv');
function csv_file_size() 
{
	const fs = require("fs"); //Load the filesystem module
	const stats = fs.statSync("C:/Users/KSHITIJ/Desktop/score/file1.csv");
	const fileSizeInBytes = stats.size;
	return parseInt(fileSizeInBytes);
}


function bytesToSize(bytes) 
{
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


function appending_csv()
{
	var fs = require('fs');
 	var data1 = randomString();
	fs.appendFileSync('C:/Users/KSHITIJ/Desktop/score/file1.csv',data, 'utf8');    // callback function
}


async function main()
{

	try
	{
	  await fs.writeFile('file1.csv', data);	// need to be in an async function
	}
	catch(e)
	{
	  console.log(e)
	}
	var loop = true
	while(loop)
	{
		if (csv_file_size() < 32223443)
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
	 	const data = await fs.readFile('file1.csv');
	 	var h = {};
	 	var hs = new Set();
	 	var j = 0;
	 	var i = 0;
		function hmm()
		{
	 		var counter = 1;
	 		return counter
	 	}
	 	while(j < 1000)
	 	{
			var sub = '';
			for( ;i < j + 3000; i++)		//iteration logic for 3000 characters
			{			
				sub += String.fromCharCode(data[i]);
			}
			j += 1;
			i = j 
			
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
		var max = Object.keys(h).reduce((a, v) => Math.max(a, h[v]), -Infinity);
		var result = Object.keys(h).filter(v => h[v] === max);
		// console.log(result);		
		for (const value of result) 
		{
	  		console.log(Math.pow(3000, 2) * Math.pow((h[value] - 1), 0.33));	//score of the subsequence
	  		break;	//for displaying the score only once,for loop can be 
		}
	}
	catch (error)
	{
	  console.log(error)
	}
}


main()

