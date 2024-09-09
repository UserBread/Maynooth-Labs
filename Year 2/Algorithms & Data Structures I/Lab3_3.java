import java.util.Scanner;

public class Lab3_3 {
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		System.out.println("Please enter your starting value: ");
		int start = sc.nextInt();
		System.out.println("Please enter your ending value: ");
		int end = sc.nextInt();
		sc.close();
		
		sieveOfEratosthenes(start, end);
	}
	
	static void sieveOfEratosthenes(int start, int end)
	{
		int count = 0;
		boolean [] sieve = new boolean[end+1];
		
		for (int i = 2; i <= end; i++) {
			sieve[i] = true;
		}
		
		for (int i = 0; i * i <= end; i++) {
			
			if (sieve[i] == true) {
				for (int j = i * i; j <= end; j += i) {
					sieve[j] = false;
				}
			}
		}
		
		for (int i = start; i <= end; i++) {
			if (sieve[i] == true) {
				count++;
			}
		}
		System.out.print(count);
	}
	
}