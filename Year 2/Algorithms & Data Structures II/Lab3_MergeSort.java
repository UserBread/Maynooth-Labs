import java.util.*;

public class Lab3_MergeSort 
{
	public static void main(String [] args) {
		Scanner sc = new Scanner(System.in);
		String word1 = sc.nextLine();
		String word2 = sc.nextLine();
		String combWords = word1.concat(word2);
		sc.close();
		
		int arrLen = combWords.length();
		char[] wordArr = new char[arrLen];
		
		for (int i = 0; i < arrLen; i++) {
			wordArr[i] = combWords.charAt(i);
		}
		
		mergeSort(wordArr);
		for (int i = 0; i < arrLen; i++) {
			System.out.print(wordArr[i]);
		}
	}
	
	public static void mergeSort(char[] words) {
		int len = words.length;
		if (words.length <= 1) return; //base case
		
		int middle = len/2;
		char [] left = new char[middle];
		char [] right = new char[words.length - middle];
		
		for (int i = 0, j = 0; i < len; i++) {
			if(i < middle) left[i] = words[i];
			else {
				right[j] = words[i];
				j++;
			}
		}
		mergeSort(left);
		mergeSort(right);
		merge(left, right, words);
	}
	
	public static void merge(char[] left, char[] right, char[] words) {
		
		int l = words.length/2;
		int r = words.length - l;
		int a = 0, b = 0, c = 0;
		
		while (b < l && c < r) {
			if(left[b] < right[c]) {
				words[a] = left[b];
				a++;
				b++;
			}
			else {
				words[a] = right[c];
				a++;
				c++;
			}
		}
		while (b < l) {
			words[a] = left[b];
			a++;
			b++;
		}
		while (c < r) {
			words[a] = right[c];
			a++;
			c++;
		}
	}
}
