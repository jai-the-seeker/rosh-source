```c++
#include <iostream>
#include <string>

int main() {
    try{
        throw 6;
    }
    catch(int e) {
        std::cout << "Int exception thrown " << std::to_string(e) << std::endl;
    }
} 
```
