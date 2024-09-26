public class Lab1_AmongUsMonteCarlo 
{

	public static void main(String [] args) {
		
		int ntrials = 1000;
		int ImposterWins = 0;
		
		for (int i = 0; i < ntrials; i++) {
			
			int n_participants = 22;
			int n_Imposter = 3;
			Participant [] participants = new Participant [n_participants];
			
			//Creating and Setting roles of Participants
			for (int x = 0; x < n_participants; x++) {
				
				participants[x] = new Participant();
			}
			for (int x = 0; x < n_Imposter; x++) {
				
				int y = 0;
				do {
					y = (int) (Math.random() * n_participants);
				} while (participants[y].getRole() == "Imposter");
				participants[y].setRole("Imposter");
			}
			
//			System.out.println("Roles set");
			for (int x = n_participants; x > 2; x -= 2) {
					
				//Status Checker
				boolean GameOver = true;
				for (int y = 0; y < n_participants; y++) {
					
					if (participants[y].getRole() == "Crewmate" && participants[y].getStatus() == "Alive") {
						
						GameOver = false;
						break;
					}
				}
				if (GameOver == false) {
					
					int k1, k2;	
					//Imposter Kill
					do {
						k1 = (int) (Math.random() * n_participants);
					} while (participants[k1].getRole() == "Imposter" || participants[k1].getStatus() == "Dead");
					participants[k1].setStatus("Dead");
					
					//Crewmate Vote Kill
					do {
						k2 = (int) (Math.random() * n_participants);
					} while(participants[k2].getStatus() == "Dead");
					participants[k2].setStatus("Dead");
				}
				else break;
			}
			
//			System.out.println("Game Complete");
			
			//Checking last 2 alive
			for (int x = 0; x < n_participants; x++) {
				
				if (participants[x].getStatus() == "Alive" && participants[x].getRole() == "Imposter") {
					ImposterWins++;
					break;
				}
			}
		}
		System.out.println((double) ImposterWins/ntrials);
		
	}
}

class Participant 
{

	String role;
	String status;
	
	public Participant() {
		
		role = "Crewmate";
		status = "Alive";
	}
	
	public Participant(String role, String status) {
		
		this.role = role;
		this.status = status;
	}
	
	public void setRole (String r) {
		
		role = r;
	}
	
	public void setStatus (String s) {
		
		status = s;
	}
	
	public String getRole () {
		return role;
	}
	
	public String getStatus () {
		return status;
	}
}
