#include "controller.cpp"

int main()
{
    View v;
    Model m;
    Controller control(v, m);
    control.appBehaviour();
}