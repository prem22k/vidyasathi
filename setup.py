#!/usr/bin/env python3
"""
Setup script for Vidyasaathi - Hindi AI Assistant
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        return False
    print(f"✅ Python {sys.version.split()[0]} detected")
    return True

def install_requirements():
    """Install required packages"""
    try:
        print("📦 Installing requirements...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install requirements")
        return False

def setup_environment():
    """Setup environment file"""
    if not os.path.exists('.env'):
        try:
            with open('.env.example', 'r') as source:
                content = source.read()
            with open('.env', 'w') as target:
                target.write(content)
            print("✅ Environment file created (.env)")
            print("⚠️  Please add your Hugging Face API token to .env file")
        except Exception as e:
            print(f"❌ Failed to create .env file: {e}")
            return False
    else:
        print("✅ Environment file already exists")
    return True

def create_directories():
    """Create necessary directories"""
    directories = ['user_feedback', 'logs']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✅ Created directory: {directory}")

def main():
    """Main setup function"""
    print("🚀 Setting up Vidyasaathi - Hindi AI Assistant")
    print("=" * 50)
    
    if not check_python_version():
        return False
    
    if not install_requirements():
        return False
    
    if not setup_environment():
        return False
    
    create_directories()
    
    print("\n" + "=" * 50)
    print("✅ Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Add your Hugging Face API token to .env file")
    print("2. Run: python app.py")
    print("3. Open http://localhost:5000 in your browser")
    print("4. Start chatting with Vidyasaathi in Hindi!")
    
    return True

if __name__ == "__main__":
    main()
