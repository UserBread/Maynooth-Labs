import java.util.Scanner;

public class Lab4_1 {
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		System.out.println("Please enter a value for n: ");
		int n = sc.nextInt();
		sc.close();
		Eulers(n);
		PI(n);
	}
	
	public static void Eulers(int n)
	{
		double e = 0;
		
		for (int i = 0; i < n; i++) {
			int x = 0;
			int y = 0;
			
			while (x < 9999) {
				x += (int)(Math.random() * 9999) + 1;
				y++;
			}
			e += y;
		}
		e /= n;
		double diff = e - 2.71828;
		System.out.println("The estimated value of e is: " + e);
		System.out.println("The absolute error is " + Math.abs(diff));
	}
	
	public static void PI(int n)
	{
		double pi = 0;
		double circle_points = 0;
		//double square_points = 1;
		for (int i = 0; i < n; i++)
		{
			double x = Math.random() * 2 - 1;
			double y = Math.random() * 2 - 1;
			double dist_from_origin = Math.sqrt(x * x + y * y);
			
			if (dist_from_origin <= 1) {
				circle_points++;
			}
			
			//square_points++;
		}
		
		pi = (4 * circle_points) / n;
		System.out.println("The estimated value of PI is: " + pi);
	}
}