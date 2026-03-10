#include <cmath>
class Model
{
public:
    int num;
    void setNumero(int n)
    {
        this->num = n;
    }

    double raiz()
    {
        return sqrt(num);
    }
    int quadrado()
    {
        return num*num;
    }
    int fatorial()
    {
        int aux = 1;
        for(int i = 1; i<=num; i++)
        {
            aux *= i;
        }
        return aux;
    }
};