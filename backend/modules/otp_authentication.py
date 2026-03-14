"""
OTP Authentication Module - SMS-based student verification
Handles OTP generation, sending, and verification
"""

import random
import string
from datetime import datetime, timedelta

class OTPManager:
    """Manages OTP generation and verification"""
    
    def __init__(self, expiry_minutes=5, max_attempts=3):
        """
        Initialize OTP manager
        
        Args:
            expiry_minutes (int): OTP expiry time in minutes
            max_attempts (int): Maximum verification attempts
        """
        self.expiry_minutes = expiry_minutes
        self.max_attempts = max_attempts
        self.otp_store = {}  # In production, use Redis/database
    
    def generate_otp(self, length=6):
        """
        Generate random OTP code
        
        Args:
            length (int): Length of OTP
        
        Returns:
            str: Generated OTP
        """
        return ''.join(random.choices(string.digits, k=length))
    
    def send_otp_sms(self, phone_number, otp_code):
        """
        Send OTP via SMS (placeholder for Twilio/Africa's Talking integration)
        
        Args:
            phone_number (str): Recipient phone number (+254...)
            otp_code (str): OTP code to send
        
        Returns:
            dict: Send status
        """
        # TODO: Integrate with actual SMS service
        # Example would use Twilio or Africa's Talking API
        
        return {
            'success': True,
            'phone_number': self._mask_phone(phone_number),
            'message': f'OTP sent to {self._mask_phone(phone_number)}',
            'delivery_status': 'pending'
        }
    
    def store_otp(self, identifier, otp_code):
        """
        Store OTP for verification
        
        Args:
            identifier (str): Student ID or phone number
            otp_code (str): OTP to store
        """
        self.otp_store[identifier] = {
            'code': otp_code,
            'created_at': datetime.now(),
            'attempts': 0,
            'verified': False
        }
    
    def verify_otp(self, identifier, otp_code):
        """
        Verify OTP code
        
        Args:
            identifier (str): Student ID or phone number
            otp_code (str): OTP code to verify
        
        Returns:
            dict: Verification result
        """
        if identifier not in self.otp_store:
            return {'success': False, 'message': 'OTP not found'}
        
        otp_data = self.otp_store[identifier]
        
        # Check if expired
        expiry_time = otp_data['created_at'] + timedelta(minutes=self.expiry_minutes)
        if datetime.now() > expiry_time:
            return {'success': False, 'message': 'OTP has expired'}
        
        # Check attempts
        if otp_data['attempts'] >= self.max_attempts:
            return {'success': False, 'message': 'Maximum attempts exceeded'}
        
        # Verify code
        if otp_data['code'] == otp_code:
            otp_data['verified'] = True
            return {'success': True, 'message': 'OTP verified successfully'}
        
        otp_data['attempts'] += 1
        remaining = self.max_attempts - otp_data['attempts']
        return {
            'success': False,
            'message': f'Invalid OTP. {remaining} attempts remaining'
        }
    
    def request_otp(self, identifier, phone_number):
        """
        Main OTP request flow
        
        Args:
            identifier (str): Student identifier
            phone_number (str): Phone number to send OTP
        
        Returns:
            dict: Request status
        """
        otp_code = self.generate_otp()
        self.store_otp(identifier, otp_code)
        
        send_result = self.send_otp_sms(phone_number, otp_code)
        
        return {
            'success': send_result['success'],
            'message': send_result['message'],
            'identifier': identifier,
            'expiry_minutes': self.expiry_minutes
        }
    
    @staticmethod
    def _mask_phone(phone_number):
        """Mask phone number for privacy"""
        if len(phone_number) >= 4:
            return phone_number[:-4] + '****'
        return '****'
