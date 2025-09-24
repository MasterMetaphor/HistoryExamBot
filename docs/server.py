#!/usr/bin/env python3
"""
Simple HTTP server for History 2310 Study Bot
Serves the web application and study materials
"""

import http.server
import socketserver
import os
import json
from pathlib import Path

class StudyBotHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle requests for study materials
        if self.path.startswith('/content/'):
            filename = self.path[9:]  # Remove '/content/' prefix
            file_path = Path('content') / filename
            
            if file_path.exists() and file_path.suffix == '.txt':
                self.send_response(200)
                self.send_header('Content-type', 'text/plain; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    self.wfile.write(content.encode('utf-8'))
                return
        
        # Handle requests for file listing
        if self.path == '/api/materials':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            materials = []
            content_dir = Path('content')
            
            if content_dir.exists():
                for file_path in content_dir.glob('*.txt'):
                    materials.append({
                        'filename': file_path.name,
                        'name': file_path.stem.replace('_', ' ').replace('-', ' '),
                        'size': file_path.stat().st_size
                    })
            
            self.wfile.write(json.dumps(materials).encode('utf-8'))
            return
        
        # Default to serving static files
        super().do_GET()

def main():
    PORT = 8000
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), StudyBotHandler) as httpd:
        print(f"History 2310 Study Bot server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")

if __name__ == "__main__":
    main()
