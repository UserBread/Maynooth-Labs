import java.util.Scanner;

public class Lab4_2 {
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		System.out.println("Please enter a value for n: ");
		int n = sc.nextInt();
		PI(n);
		sc.close();
	}
	
	//Circle centered at (0, 0), r = 1
	public static void PI(int n)
	{
		double pi = 0;
		double circle_points = 0;
		double square_points = 1;
		for (int i = 0; i < n; i++)
		{
			double x = Math.random() * 2 - 1;
			double y = Math.random() * 2 - 1;
			double dist_from_origin = x * x + y * y;
			
			if (dist_from_origin <= 1) {
				circle_points++;
			}
			
			square_points++;
		}
		
		pi = (4 * circle_points) / square_points;
		System.out.println("The estimated value of PI is: " + pi);
	}
}