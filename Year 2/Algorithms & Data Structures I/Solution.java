package cs210_Labs;

public class Solution {
	
	int max = 1001;
	
	public int find(int size, HashTable mytable, String word)
	{
		//fill this in so as to minimize collisions
	    //takes in the HashTable object and the word to be found
	    //the only thing you can do with the HashTable object is call "check"
	    //this method should return the slot in the hashtable where the word is
		int hash = Math.abs(word.hashCode());
		int jump = max - hash % max;
		hash %= size;
		
		while (mytable.check(hash, word) == false) {
			if (mytable.check(hash, word) == true) {
				return hash;
			}
			hash = (hash + jump)  % size;
		}
		return 0;
	}
	public String[] fill(int size, String[] array)
	{
	    //takes in the size of the hashtable, and the array of Strings to be placed in the hashtable
	    //this should add all the words into the hashtable using some system
	    //then it should return the hashtable array

	    String[] hashtable = new String[size];
	    
	    for (int i = 0; i < array.length; i++) {
	    	
	    	int hash = Math.abs(array[i].hashCode());
	    	int jump = max - hash % max;
	    	hash %= size;
	    	
	    	while (hashtable[hash] != null) {
	    		hash = (hash + jump) % size;
	    	}
	    	hashtable[hash] = array[i];
	    }
	    return hashtable;
	}
//	public int getHash(String s) {
//		int hash = 7;
//		for (int i = 0; i < s.length(); i++) {
//			hash += s.charAt(i);
//			hash *= s.charAt(i);
//		}
//		return hash;
//	}
}
	