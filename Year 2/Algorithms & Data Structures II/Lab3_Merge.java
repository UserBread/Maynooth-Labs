import java.util.*;

public class Lab3_Merge 
{
	
	public static void main(String [] args) {
		
		Scanner sc = new Scanner(System.in);
		String word1 = sc.nextLine();
		String word2 = sc.nextLine();
		sc.close();
		
		int mergeLength = word1.length() + word2.length();
		String merged = "";
		
		for (int i = 0; i < mergeLength; i++) {
			if (i % 2 == 0 && word1.length() != 0) {
				merged = merged + word1.charAt(0);
				word1 = word1.substring(1);
			}
			else if (word2.length() != 0) {
				merged = merged + word2.charAt(0);
				word2 = word2.substring(1);
			}
			else {
				
				if (word1.length() != 0) merged += word1;
				else merged += word2;
			}
		}
		System.out.println(merged);
	}
}
