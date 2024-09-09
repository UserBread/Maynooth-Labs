import java.util.Scanner;

public class Lab3_2 {
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		System.out.println("Please enter your starting value: ");
		int start = sc.nextInt();
		System.out.println("Please enter your ending value: ");
		int end = sc.nextInt();
		sc.close();
		int count = 0;
		
		while(start <= end)	{
			if (primes(start) == true) {
				//System.out.print(start + " ");
				count++;
			}
			start++;
		}
		System.out.println("There are " + count + " prime numbers in that range!");
	}
	
	public static boolean primes(int start) 
	{
		boolean isPrime = false;
		if (start <= 1) {
				isPrime = false;	
			}
		else if (start == 2 || start == 3) {
			isPrime = true;
		}
		else {
			for(int i = 2; i <= start/2; i++) {
				if (start % i == 0) {
					isPrime = false;
					break;
				}
				else {
					isPrime = true;
				}
			}
		}
		return isPrime;
	}
}