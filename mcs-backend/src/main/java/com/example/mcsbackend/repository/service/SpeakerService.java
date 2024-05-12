package com.example.mcsbackend.repository.service;

import com.example.mcsbackend.model.Speaker;
import com.example.mcsbackend.repository.Speakerrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpeakerService {
    @Autowired
    private Speakerrepo speakerrepo;
    public List<Speaker> getAllUsers() {
        return speakerrepo.findAll();
    }
    public void createUser(Speaker speaker) {
        speakerrepo.save(speaker);
    }
}
