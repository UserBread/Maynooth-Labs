package cs210_Labs;

import java.util.Scanner;

public class Lab6_1 {
	
	static int [] points = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int n;
		
		//create a do-while loop to keep prompting the user if it doesn't fit the constraint
		do
		{
			n = sc.nextInt();
		} while (n < 2 || n > 100);
		
		String [] words = new String [n];
		int [] scores = new int [n];
		
		//Stores inputed words in a string array
		for (int i = 0; i < n; i++)
		{
			words[i] = sc.next();
		}
		sc.close();
		scores(words, scores);
		
		for (int i = 0; i < n; i++)
		{
			System.out.println(words[i]);
//			System.out.println(scores[i]);
		}
	}
	
	public static void scores(String [] words, int [] scores)
	{
		//outer loop to get the string
		for (int i = 0, arrlen = words.length; i < arrlen; i++)
		{
			int sum = 0;
			String temp;
			temp = words[i].toLowerCase();
			//inner loop to get the chars of the string
			for (int j = 0, strlen = words[i].length(); j < strlen; j++)
			{
				
				int t = temp.charAt(j) % 'a';
				sum += points[t];
				
			}
			scores[i] = sum;
		}
		sort(words, scores);
	}
	
	public static void sort(String [] words, int [] scores)
	{
		//bubble sorting algorithm
		for (int i = scores.length - 1; i > 0 ; i--)
		{
			for (int j = 0; j < i; j++)
			{
				//numerical
				if (scores[j] > scores[j + 1])
				{
					int temp = scores[j];
					scores[j] = scores[j + 1];
					scores[j + 1] = temp;
					
					String temp2 = words[j];
					words[j] = words[j + 1];
					words[j + 1] = temp2;
				}
				//alphabetical
				else if (scores[j] == scores[j+1])
				{
					if (words[j].compareTo(words[j + 1]) > 0)
					{
						int temp = scores[j];
						scores[j] = scores[j + 1];
						scores[j + 1] = temp;
						
						String temp2 = words[j];
						words[j] = words[j + 1];
						words[j + 1] = temp2;
					}
				}
			}
		}
	}
}
