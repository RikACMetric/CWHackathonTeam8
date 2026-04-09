import io
import sys
import unittest


class TestHello(unittest.TestCase):
    def test_hello_world(self):
        captured = io.StringIO()
        sys.stdout = captured
        exec(open("hello.py").read())
        sys.stdout = sys.__stdout__
        self.assertEqual(captured.getvalue(), "Hello, World!\n")


if __name__ == "__main__":
    unittest.main()
