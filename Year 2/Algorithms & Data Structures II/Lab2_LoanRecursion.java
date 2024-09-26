import java.util.*;

public class Lab2_LoanRecursion 
{

	public static void main(String [] args) {
		
		Scanner scan = new Scanner(System.in);
		int loan = scan.nextInt();
		double interestRate = scan.nextDouble();
		int payment = scan.nextInt();
		scan.close();
		
		int n = Repayment(loan, interestRate, payment);
		System.out.println(n + " months");
	}
	
	public static int Repayment(int loan, double interestRate, int payment) {
		
		if (loan <= 0) {
			return 0;
		}
		else {
			loan = (int) (loan - payment + (loan * (interestRate/12)));
			return Repayment(loan, interestRate, payment) + 1;	
		}
	}
}
