package cl.duoc.services;

/**
 * Created by Usuario on 24-05-2017.
 */
public interface SecurityService {
    String findLoggedInUsername();
    void autologin(String username, String password);
}
