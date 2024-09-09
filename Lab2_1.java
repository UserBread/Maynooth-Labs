import java.util.Scanner;

public class Lab2_1 {
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		long n = sc.nextLong();
		sc.close();
		
		if (checkSum(n) == true)
		{
			System.out.println("VALID");
		}
		else 
		{
			System.out.println("INVALID");
		}
	}
	
	public boolean checkSum(long n)
	{
		int counter = 1;
		int sum = 0;
		
		while (n != 0)
		{
			if(counter % 2 == 0)
			{
				if(2 * (n % 10) > 9)
				{
					sum += 2 * (n % 10) - 9;
				}
				else
				{
					sum += 2 * (n % 10);
				}
			}
			else
			{
				sum += n % 10;
			}
			counter++;
			n /=10;
		}
		if(sum % 10 == 0 && counter-1 >= 4 && counter-1 <= 30)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}