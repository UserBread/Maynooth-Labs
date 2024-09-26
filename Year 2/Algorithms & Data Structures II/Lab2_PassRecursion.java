import java.util.*;

public class Lab2_PassRecursion 
{

	public static void main(String [] args) {
		
		Scanner sc = new Scanner(System.in);
		String input = sc.nextLine();
		sc.close();
		int LateCounter = 0;
		int AbsentCounter = 0;
		
		boolean failed = Attendance(input, LateCounter, AbsentCounter);
		
		if (!failed) {
			System.out.println("Student has failed");
		}
		else {
			System.out.println("Student has passed");
		}
	}
	
	public static boolean Attendance(String input, int late, int absent) {
		
		//Recursive Case
		if (late == 3 || absent >= 2) return false;
		else if (input.length() == 0) {
			return true;
		}
		else {
			char c = input.charAt(0);
			if (c == 'L') {			
				return Attendance(input.substring(1), ++late, absent);
			}
			else if (c == 'A') {
				return Attendance(input.substring(1), 0, ++absent);
			}
			else {
				return Attendance(input.substring(1), 0, absent);
			}
		}
	}
}
