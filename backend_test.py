import requests
import sys
import json
from datetime import datetime, timedelta
import uuid

class ExpenseTrackerAPITester:
    def __init__(self, base_url="https://spendwise-1376.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=30)

            success = response.status_code == expected_status
            
            if success:
                self.log_test(name, True)
                try:
                    return True, response.json() if response.content else {}
                except:
                    return True, {}
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}. Response: {response.text[:200]}")
                return False, {}

        except Exception as e:
            self.log_test(name, False, f"Request failed: {str(e)}")
            return False, {}

    def test_user_registration(self):
        """Test user registration"""
        test_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        user_data = {
            "name": "Test User",
            "email": test_email,
            "password": "TestPass123!"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=user_data
        )
        
        if success and 'token' in response:
            self.token = response['token']
            self.user_id = response['user']['id']
            return True, test_email
        return False, None

    def test_user_login(self, email, password="TestPass123!"):
        """Test user login"""
        login_data = {
            "email": email,
            "password": password
        }
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        
        if success and 'token' in response:
            self.token = response['token']
            self.user_id = response['user']['id']
            return True
        return False

    def test_get_user_profile(self):
        """Test get current user profile"""
        success, response = self.run_test(
            "Get User Profile",
            "GET",
            "auth/me",
            200
        )
        return success

    def test_create_expense(self, amount=100.50, category="Food", description="Test expense", date=None):
        """Test creating an expense"""
        if not date:
            date = datetime.now().strftime('%Y-%m-%d')
            
        expense_data = {
            "amount": amount,
            "category": category,
            "description": description,
            "date": date
        }
        
        success, response = self.run_test(
            f"Create Expense ({category})",
            "POST",
            "expenses",
            200,
            data=expense_data
        )
        
        if success and 'id' in response:
            return True, response['id']
        return False, None

    def test_get_expenses(self):
        """Test getting all expenses"""
        success, response = self.run_test(
            "Get All Expenses",
            "GET",
            "expenses",
            200
        )
        
        if success:
            return True, response
        return False, []

    def test_get_expense_by_id(self, expense_id):
        """Test getting a specific expense"""
        success, response = self.run_test(
            "Get Expense by ID",
            "GET",
            f"expenses/{expense_id}",
            200
        )
        return success, response

    def test_update_expense(self, expense_id, amount=150.75):
        """Test updating an expense"""
        update_data = {
            "amount": amount,
            "description": "Updated test expense"
        }
        
        success, response = self.run_test(
            "Update Expense",
            "PUT",
            f"expenses/{expense_id}",
            200,
            data=update_data
        )
        return success

    def test_delete_expense(self, expense_id):
        """Test deleting an expense"""
        success, response = self.run_test(
            "Delete Expense",
            "DELETE",
            f"expenses/{expense_id}",
            200
        )
        return success

    def test_expense_filters(self):
        """Test expense filtering"""
        # Test category filter
        success, _ = self.run_test(
            "Filter by Category",
            "GET",
            "expenses?category=Food",
            200
        )
        
        if not success:
            return False
            
        # Test date range filter
        start_date = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')
        end_date = datetime.now().strftime('%Y-%m-%d')
        
        success, _ = self.run_test(
            "Filter by Date Range",
            "GET",
            f"expenses?start_date={start_date}&end_date={end_date}",
            200
        )
        
        return success

    def test_monthly_summary(self):
        """Test monthly summary endpoint"""
        current_month = datetime.now().strftime('%Y-%m')
        
        success, response = self.run_test(
            "Monthly Summary",
            "GET",
            f"expenses/summary/monthly?month={current_month}",
            200
        )
        
        if success:
            # Verify response structure
            required_fields = ['total_expenses', 'total_count', 'category_breakdown', 'daily_expenses', 'top_categories']
            for field in required_fields:
                if field not in response:
                    self.log_test("Monthly Summary Structure", False, f"Missing field: {field}")
                    return False
            
            self.log_test("Monthly Summary Structure", True)
            return True
        return False

    def test_export_pdf(self):
        """Test PDF export"""
        current_month = datetime.now().strftime('%Y-%m')
        
        try:
            url = f"{self.api_url}/expenses/export/pdf?month={current_month}"
            headers = {'Authorization': f'Bearer {self.token}'}
            
            response = requests.get(url, headers=headers, timeout=30)
            
            if response.status_code == 200 and response.headers.get('content-type') == 'application/pdf':
                self.log_test("Export PDF", True)
                return True
            else:
                self.log_test("Export PDF", False, f"Status: {response.status_code}, Content-Type: {response.headers.get('content-type')}")
                return False
                
        except Exception as e:
            self.log_test("Export PDF", False, str(e))
            return False

    def test_export_excel(self):
        """Test Excel export"""
        current_month = datetime.now().strftime('%Y-%m')
        
        try:
            url = f"{self.api_url}/expenses/export/excel?month={current_month}"
            headers = {'Authorization': f'Bearer {self.token}'}
            
            response = requests.get(url, headers=headers, timeout=30)
            
            expected_content_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            if response.status_code == 200 and expected_content_type in response.headers.get('content-type', ''):
                self.log_test("Export Excel", True)
                return True
            else:
                self.log_test("Export Excel", False, f"Status: {response.status_code}, Content-Type: {response.headers.get('content-type')}")
                return False
                
        except Exception as e:
            self.log_test("Export Excel", False, str(e))
            return False

    def run_comprehensive_test(self):
        """Run all tests in sequence"""
        print("🚀 Starting Expense Tracker API Tests...")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test user registration and authentication
        reg_success, test_email = self.test_user_registration()
        if not reg_success:
            print("❌ Registration failed, stopping tests")
            return False
            
        # Test user profile
        self.test_get_user_profile()
        
        # Create test expenses
        expense_ids = []
        categories = ["Food", "Transport", "Shopping", "Entertainment"]
        
        for i, category in enumerate(categories):
            success, expense_id = self.test_create_expense(
                amount=50.0 + (i * 25),
                category=category,
                description=f"Test {category.lower()} expense"
            )
            if success and expense_id:
                expense_ids.append(expense_id)
        
        # Test expense retrieval
        self.test_get_expenses()
        
        # Test individual expense operations
        if expense_ids:
            first_expense_id = expense_ids[0]
            
            # Test get by ID
            self.test_get_expense_by_id(first_expense_id)
            
            # Test update
            self.test_update_expense(first_expense_id)
            
            # Test filters
            self.test_expense_filters()
            
            # Test monthly summary
            self.test_monthly_summary()
            
            # Test exports
            self.test_export_pdf()
            self.test_export_excel()
            
            # Test delete (only delete one expense to keep data for other tests)
            if len(expense_ids) > 1:
                self.test_delete_expense(expense_ids[-1])
        
        # Print final results
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

def main():
    tester = ExpenseTrackerAPITester()
    success = tester.run_comprehensive_test()
    
    # Save detailed results
    results = {
        "timestamp": datetime.now().isoformat(),
        "total_tests": tester.tests_run,
        "passed_tests": tester.tests_passed,
        "success_rate": (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0,
        "test_details": tester.test_results
    }
    
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())