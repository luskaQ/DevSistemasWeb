#include <iostream>
class View
{

public:
    int num;
    char op;
    double resultado;

    void interfaceValores()
    {

        std::cout << "Digite um número inteiro: \n";
        std::cin >> num;
        system("clear");
        std::cout << "Digite uma operação (Raiz =r, quadrado=q ou fatorial=f): \n";
        std::cin >> op;
    }
    void interfaceResultado()
    {
        std::cout << "Resultado: " << resultado << "\n";
    }

    int getNum()
    {
        return num;
    }

    char getOperacao()
    {
        return op;
    }

    void setResultado(double resul)
    {
        resultado = resul;
    }
};
